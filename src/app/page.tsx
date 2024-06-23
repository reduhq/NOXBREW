'use client'

import { Navbar } from "@/components/navbar/Navbar";
import {IconSearch} from "@tabler/icons-react"
import styles from './index.module.css'
import coffee_data from "./../data/data.json"
import { Product_card } from "@/components/product_card/Product_card";
import { CoffeeSection } from "@/components/coffee_section/CoffeeSection";
import { SearchSection } from "@/components/search_section/SearchSection";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState('')
  const searchHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault()
    setSearch(e.target.value)

  }
  return (
    <>
      <div className={`container ${styles.main}`}>
        <h2 className={styles.h2}>Disfruta de tu café favorito sin moverte de casa.</h2>
        <div className={styles.search_input}>
          <div>
            <IconSearch color="#9ca3af"/>
          </div>
          <input onChange={searchHandler} type="search" name="search_coffee" id="search_coffee" placeholder="Busca tu café"/>
        </div>
        {
          search&&(
            <SearchSection
            searchStr={search}
            />
          )
        }
        <CoffeeSection/>
      </div>
    </>
  );
}
