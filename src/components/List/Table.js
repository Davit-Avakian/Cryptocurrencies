import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

const Table = ({currencies, renderChangePercent, sortCurrencies}) =>{
    return (
        <div className="Table-container">
        <table className="Table">
            <thead className="Table-head">
                <tr>
                    <th onClick={() => sortCurrencies('name', true)}><span>Cryptocurrency</span></th>
                    <th onClick={() => sortCurrencies('current_price')}><span>Price</span></th>
                    <th onClick={() => sortCurrencies('market_cap')}><span>Market Cap</span></th>
                    <th onClick={(() => sortCurrencies('market_cap_change_percentage_24h'))}><span>24H Change</span></th>
                </tr>
            </thead>
            <tbody className="Table-body">
                {
                    currencies.map(({id,name,image, current_price, market_cap, market_cap_change_percentage_24h}) => {
                        return (
                            <motion.tr key={id}
                                whileHover={{
                                    textShadow: '0px 0px 8px black',
                                    boxShadow: '0px 0px 8px black',
                                    scale: 1
                                }}
                            >
                                    <td>
                                        <Link to={`/currency/${id}`} className='link'>
                                            <span className="Table-rank">
                                                <img
                                                    style={{ width: '50px', height: '50px' }}
                                                    src={image}
                                                    alt={name}
                                                />
                                            </span>
                                            {name}
                                        </Link>

                                    </td>
                                    <td>
                                        <span className="Table-dollar">{current_price}$</span>
                                    </td>
                                    <td>
                                    <span className="Table-dollar">{market_cap}$</span>
                                    </td>
                                    <td>
                                    {
                                        renderChangePercent(market_cap_change_percentage_24h)
                                    }
                                    </td>
                            </motion.tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    )
}
export default Table