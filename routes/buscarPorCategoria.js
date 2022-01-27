const { Router } = require("express");
const { buscarPorCategoria } = require("../controller/buscarPorCategoria");

const router = Router();

router.get("/:categoria", buscarPorCategoria);

module.exports = router;
