exports.sendReqParam = (req, res) => {
    let userId = req.params.id;
    res.send(`Page for ${userId}`);
};

exports.logRequestPaths = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST successful");
}

exports.getHomePage = (req, res) => {
    res.render("index");
}

exports.getContactPage = (req, res) => {
    res.render("contact");
}

exports.getForumPage = (req, res) => {
    res.render("forum");
}