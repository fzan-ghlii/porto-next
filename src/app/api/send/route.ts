import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Ambil API key dari environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Ambil data dari body request (yang dikirim dari form)
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Kirim email menggunakan Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Alamat 'dari' default Resend
      to: 'algholifauzan@gmail.com', // GANTI DENGAN EMAIL ANDA
      subject: `Pesan Baru dari Portofolio - ${name}`,
      html: `
        <div>
          <h2>Pesan dari ${name} (${email})</h2>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Kirim respons sukses
    return NextResponse.json({ data });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
