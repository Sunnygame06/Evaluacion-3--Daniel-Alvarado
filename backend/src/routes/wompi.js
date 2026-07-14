import express from "express"
import wompiController from "../controller/wompiController.js"

const router = express.Router()

router.route("/token").post(wompiController.generarToken)
router.route("/paymenTest").post(wompiController.paymentTest)

export default router;