import React, {useState, useEffect} from "react";
import styles from './BrandList.module.css'


function GroupBrandsByFirstLetter(brandlist) {
  const groupedBrands = {}

  brandlist.forEach(brand => {
    console.log(brand['name'])
    const firstLetter = brand['name'][0].toUpperCase();

    if (!groupedBrands[firstLetter]) {
      groupedBrands[firstLetter] = [];
    }

    groupedBrands[firstLetter].push(brand);
  })
  return groupedBrands
}

const BrandList = ({brandlist}) => {

  const groupedBrands = GroupBrandsByFirstLetter(brandlist)

  return(
    <div className={styles.brandlist_list}>
      {Object.keys(groupedBrands).map(letter => (
        <div key={letter} className={styles.brandlist_item}>
          <div className={styles.brandlist_title}>
          {letter}
          </div>
          <ul className={styles.brandlist_body}>
            {groupedBrands[letter].map((brand, index) => (
              <li key={index} className={styles.brandlist_body_item}>
                <a href={brand['href'].toLowerCase()} className={styles.link}>
                  <span className={styles.brandlist_body_text}>{brand['name']}</span>
                </a>
                
              </li>
            )
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default BrandList