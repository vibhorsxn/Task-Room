module.exports.createManagerAcc = function (req, res) {
    return res.render("signUp", {
        role: "manager",
        layout: false
    });
}