import { User } from "../../models/index.js"
import bcrypt from "bcrypt"

class AdminSeeder {
    static async seed() {
        await User.query().delete()

        await User.query().insert({
            email: "admin@admin.com",
            username: "Owner",
            cryptedPassword: bcrypt.hashSync("secretPassword", 10), //pre-hash password when deploying
            isAdmin: true
        })
    }
}

export default AdminSeeder