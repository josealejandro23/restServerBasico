const { Router } = require("express");
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require("../controller/usuarios");
const router = Router();

router.get("/:id?", getUsuarios);

router.post("/", postUsuarios);

router.put("/", putUsuarios);

router.delete("/", deleteUsuarios);

module.exports = router;
