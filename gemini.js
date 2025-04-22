export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const apiKey = "AIzaSyCpBupsif5dktiR7W-zbByyhHEBb4kbEAY";

    try {
        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body),
        });

        const data = await apiResponse.json(); // BACA SEKALI

        if (!apiResponse.ok) {
            // JANGAN panggil apiResponse.json() lagi di sini
            return res.status(apiResponse.status).json({
                error: data.error || { message: "Unknown error from Gemini API." }
            });
        }

        return res.status(200).json(data); // Kirim balik ke frontend
    } catch (error) {
        return res.status(500).json({ error: { message: error.message || "A server error occurred." } });
    }
}