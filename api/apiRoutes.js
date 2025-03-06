router.post("/contact", (req, res, next) => {
    const { name, email, subject, message } = req.body;

    console.log(name, email, subject, message);

    const newContact = { name, email, subject, message };
    fs.readFile(
        path.join(__dirname, "../models/contacts.json"),
        "utf-8",
        (err, data) => {
            if (err) return next(err);
            let contacts = [];
            if (data) {
                contacts = JSON.parse(data);
            }
            contacts.push(newContact);
            fs.writeFile(
                path.join(__dirname, "../models/contacts.json"),
                JSON.stringify(contacts, null, 2),
                (err) => {
                    if (err) return next(err);
                    return res.status(201).json({ message: "Contact sent" });
                }
            );
        }
    );
});