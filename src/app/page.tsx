import { Navbar } from "@/components/navbar/Navbar";
import {IconSearch} from "@tabler/icons-react"
import styles from './index.module.css'
import coffee_data from "./../data/data.json"
import { Product_card } from "@/components/product_card/Product_card";
import { CoffeeSection } from "@/components/coffee_section/CoffeeSection";

// interface Bebida{
//   nombre:string;
//   precio:number
// }


// interface Categoria{
//   titulo:string;
//   bebidas:Bebida[]
// }

export default function Home() {
  // const [categories, setCategories] = useState<Categoria[]>([])
  // useEffect(()=>{
  //   const data = Object.values(coffee_data).map( a => console.log(a))
    
  //   // setCategories(data)
  // }, [])
  
  // console.log(categories)
  return (
    <>
      <Navbar/>
      <div className={`container ${styles.main}`}>
        <h2 className={styles.h2}>Disfruta de tu café favorito sin moverte de casa.</h2>
        <div className={styles.search_input}>
          <div>
            <IconSearch color="#9ca3af"/>
          </div>
          <input type="search" name="search_coffee" id="search_coffee" placeholder="Busca tu café"/>
        </div>
        <CoffeeSection/>

      </div>
    </>
  );
}
