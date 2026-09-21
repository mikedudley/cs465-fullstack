/* GET Homepage */
const index = (req, res) => {
    res.rended('index', { title: "Travlr Getaways" });
};

module.exports = {
    index
}