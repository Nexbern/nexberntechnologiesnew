import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            service,
            fullName,
            email,
            phone,
            companyName,
            projectType,
            budget,
            timeline,
            description
        } = body;

        // Validate required fields
        if (!service || !fullName || !email || !phone || !projectType || !budget || !timeline) {
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
                    <h2 style="color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px;">New Quote Request</h2>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #007bff; margin-bottom: 15px;">Service Details</h3>
                        <p style="margin: 8px 0;"><strong>Selected Service:</strong> ${service}</p>
                        <p style="margin: 8px 0;"><strong>Project Type:</strong> ${projectType}</p>
                        <p style="margin: 8px 0;"><strong>Budget Range:</strong> ${budget}</p>
                        <p style="margin: 8px 0;"><strong>Timeline:</strong> ${timeline}</p>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3 style="color: #007bff; margin-bottom: 15px;">Client Information</h3>
                        <p style="margin: 8px 0;"><strong>Full Name:</strong> ${fullName}</p>
                        <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
                        <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #007bff;">${phone}</a></p>
                        ${companyName ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${companyName}</p>` : ''}
                    </div>

                    <div style="margin: 20px 0;">
                        <h3 style="color: #007bff; margin-bottom: 15px;">Project Description</h3>
                        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; line-height: 1.6;">
                            ${description || 'No description provided'}
                        </p>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                        <p>This quote request was submitted on ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        `;

        // Get recipient emails (supports multiple emails separated by comma)
        const recipientEmails = process.env.RECIPIENT_EMAILS
            ? process.env.RECIPIENT_EMAILS.split(',').map(email => email.trim())
            : ['syedzaidhasanh@gmail.com'];

        console.log('Attempting to send emails to:', recipientEmails);

        // Send individual emails to each recipient with error handling
        const emailResults = await Promise.allSettled(
            recipientEmails.map(async (recipientEmail) => {
                try {
                    console.log(`Sending email to: ${recipientEmail}`);
                    const result = await resend.emails.send({
                        from: 'Quote Request <onboarding@resend.dev>',
                        to: [recipientEmail],
                        subject: `New Quote Request - ${service}`,
                        html: emailHtml,
                        replyTo: email, // Client's email for easy reply
                    });
                    console.log(`✅ Email sent successfully to ${recipientEmail}`, result);
                    return { email: recipientEmail, success: true, result };
                } catch (error: any) {
                    console.error(`❌ Failed to send email to ${recipientEmail}:`, error.message);
                    return { email: recipientEmail, success: false, error: error.message };
                }
            })
        );

        // Log results
        const successful = emailResults.filter(r => r.status === 'fulfilled' && r.value.success);
        const failed = emailResults.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success));

        console.log(`\n📊 Email Summary:`);
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
                    message: `Quote request sent successfully to ${successful.length} recipient(s)!`,
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
                    error: 'Failed to send emails to any recipients. Check server logs for details.',
                    details: 'All email sends failed'
                },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Error sending email:', error);

        // Provide specific error messages based on the error type
        let errorMessage = 'Failed to send quote request. Please try again.';

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
