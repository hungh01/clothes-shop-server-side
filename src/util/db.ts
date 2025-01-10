import { DataSource } from "typeorm"
import dotenv from 'dotenv';    
import { User} from "../entities/User";
import { ProductType} from "../entities/ProductType";
import { ProductTypeDetail} from "../entities/ProductTypeDetail";
import { Product} from "../entities/Product";
import { ProductDetail} from "../entities/ProductDetail";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 2345,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "shop",
  entities: [User,ProductType,ProductTypeDetail,Product,ProductDetail],
  synchronize: true,
  logging: false,
})




export default AppDataSource;



// docker run --name postgredb -p 2345:5432 -e POSTGRES_PASSWORD=admin123 -d postgres
// docker exec -it postgredb bash
// psql -U postgres
// \l