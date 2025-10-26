/* eslint-disable no-console */
import { connection } from "../boot.js"

import AdminSeeder from "./seeders/AdminSeeder.js"
import ProductSeeder from "./seeders/ProductSeeder.js"
import VariationSeeder from "./seeders/VariationSeeder.js"
import SizeSeeder from "./seeders/SizeSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding Admin...")
    await AdminSeeder.seed()

    console.log("Seeding Products...")
    await ProductSeeder.seed()
    
    console.log("Seeding Variations...")
    await VariationSeeder.seed()

    console.log("Seeding Sizes...")
    await SizeSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder