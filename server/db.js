import dotenv from 'dotenv';
dotenv.config();


import { Pool } from 'pg';


const pool = new Pool({
     user: 'neondb_owner',
     password: 'npg_i6RAolr0VSxE',
     host: 'ep-floral-silence-amcfclk3-pooler.c-5.us-east-1.aws.neon.tech',
     database: 'neondb',
     ssl: { rejectUnauthorized: false }
   });


export default pool;
