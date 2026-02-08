import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            course,
            fullName,
            email,
            phone,
            education,
            experience,
            reason
        } = body;

        // Validate required fields
        if (!course || !fullName || !email || !phone || !education || !experience) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if Resend API key is configured
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey || resendApiKey === 'your-resend-api-key-here') {
            console.error('Resend API key not configured. Please update .env.local file.');
            return NextResponse.json(
                {
                    error: 'Email service not configured. Please contact the administrator.',
                    details: 'Resend API key needs to be set up in .env.local file'
                },
                { status: 503 }
            );
        }

        // Initialize Resend
        const resend = new Resend(resendApiKey);

        // Email HTML content
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px;">New Course Enrollment</h2>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #667eea; margin-bottom: 15px;">Course Details</h3>
                        <p style="margin: 8px 0;"><strong>Selected Course:</strong> ${course}</p>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3 style="color: #667eea; margin-bottom: 15px;">Student Information</h3>
                        <p style="margin: 8px 0;"><strong>Full Name:</strong> ${fullName}</p>
                        <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
                        <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #667eea;">${phone}</a></p>
                        <p style="margin: 8px 0;"><strong>Current Education:</strong> ${education}</p>
                        <p style="margin: 8px 0;"><strong>Experience Level:</strong> ${experience}</p>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3 style="color: #667eea; margin-bottom: 15px;">Motivation</h3>
                        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; line-height: 1.6;">
                            ${reason || 'No reason provided'}
                        </p>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                        <p>This enrollment was submitted on ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        `;

        // Get recipient emails (supports multiple emails separated by comma)
        const recipientEmails = process.env.RECIPIENT_EMAILS
            ? process.env.RECIPIENT_EMAILS.split(',').map(email => email.trim())
            : ['syedzaidhasanh@gmail.com'];

        console.log('Attempting to send enrollment emails to:', recipientEmails);

        // Send individual emails to each recipient with error handling
        const emailResults = await Promise.allSettled(
            recipientEmails.map(async (recipientEmail) => {
                try {
                    console.log(`Sending enrollment email to: ${recipientEmail}`);
                    const result = await resend.emails.send({
                        from: 'Course Enrollment <onboarding@resend.dev>',
                        to: [recipientEmail],
                        subject: `New Course Enrollment - ${course}`,
                        html: emailHtml,
                        replyTo: email, // Student's email for easy reply
                    });
                    console.log(`✅ Enrollment email sent successfully to ${recipientEmail}`, result);
                    return { email: recipientEmail, success: true, result };
                } catch (error: any) {
                    console.error(`❌ Failed to send enrollment email to ${recipientEmail}:`, error.message);
                    return { email: recipientEmail, success: false, error: error.message };
                }
            })
        );

        // Log results
        const successful = emailResults.filter(r => r.status === 'fulfilled' && r.value.success);
        const failed = emailResults.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success));

        console.log(`\n📊 Enrollment Email Summary:`);
        console.log(`✅ Successful: ${successful.length}/${recipientEmails.length}`);
        console.log(`❌ Failed: ${failed.length}/${recipientEmails.length}`);

        if (failed.length > 0) {
            console.log('\n❌ Failed emails:');
            failed.forEach(f => {
                if (f.status === 'fulfilled') {
                    console.log(`  - ${f.value.email}: ${f.value.error}`);
                }
            });
        }

        // Return success if at least one email was sent
        if (successful.length > 0) {
            return NextResponse.json(
                {
                    message: `Enrollment submitted successfully! We'll contact you soon.`,
                    details: {
                        successful: successful.length,
                        failed: failed.length,
                        total: recipientEmails.length
                    }
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    error: 'Failed to send enrollment emails. Please try again or contact us directly.',
                    details: 'All email sends failed'
                },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Error sending enrollment email:', error);

        // Provide specific error messages based on the error type
        let errorMessage = 'Failed to submit enrollment. Please try again.';

        if (error.message?.includes('API key')) {
            errorMessage = 'Email service configuration error. Please contact the administrator.';
        } else if (error.message?.includes('rate limit')) {
            errorMessage = 'Too many requests. Please try again in a few minutes.';
        } else if (error.message) {
            console.error('Detailed error:', error.message);
        }

        return NextResponse.json(
            {
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
