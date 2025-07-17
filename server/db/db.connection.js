import mongoose, { connect } from "mongoose"
import chalk from "chalk"

const connectDB =async () =>{
    try {
       const conn= await mongoose.connect(process.env.MONOGODB_URI)
       console.log(chalk.magentaBright(`MongoDB connect successfully :${conn.connection.host}`))  
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)  
    }
}

export default connectDB