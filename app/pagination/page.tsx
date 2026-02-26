"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface PaginationProps {
  totalPost: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationExample() {

    const [coinsData, setCoinsData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 20;

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "usd",
                            order: "market_cap_desc",
                            per_page: 200,
                            page: 1,
                            sparkline: false,
                        },
                    }
                );

                setCoinsData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCoins();
    }, []);

    const lastPostNumber = currentPage * postPerPage;
    const firstPostNumber = lastPostNumber - postPerPage;

    const currentPostPage = coinsData.slice(firstPostNumber, lastPostNumber);

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
                Pagination Example
                </h1>

                <CryptoList coinsData={currentPostPage} />
                <Pagination
                totalPost={coinsData.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
            </div>
            </div>
        </>
    );
}

const CryptoList = ({ coinsData }: { coinsData: any[] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {coinsData.map((coin) => (
        <CryptoCard
          key={coin.id}
          image={coin.image}
          name={coin.name}
          price={coin.current_price}
        />
      ))}
    </div>
  );
};

const CryptoCard = ({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: number;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex items-center space-x-4">
      <div className="shrink-0">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 object-contain"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {name}
        </h2>
        <h3 className="text-green-600 font-bold text-md">
          ${price.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};


const Pagination = ({ totalPost, postPerPage, currentPage, setCurrentPage }: PaginationProps) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPost / postPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 rounded ${
            currentPage === number
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};