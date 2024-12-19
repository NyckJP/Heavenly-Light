/* eslint-disable no-console */
import { connection } from "../boot.js"

import ProductSeeder from "./seeders/ProductSeeder.js"
import VariationSeeder from "./seeders/VariationSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding Products...")
    await ProductSeeder.seed()
    
    console.log("Seeding Variations...")
    await VariationSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder