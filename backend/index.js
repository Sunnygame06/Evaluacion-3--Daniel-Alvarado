import app from "./app.js"
import "./databse.js"

async function main() {
    app.listen(4000)
    console.log("Server on port 4000")
}

main()