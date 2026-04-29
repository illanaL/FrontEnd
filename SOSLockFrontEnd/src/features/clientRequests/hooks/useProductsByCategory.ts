import { useEffect, useState } from "react";
import type { Product } from "../clientRequest.types";
import { getProductsByCategory } from "../api/clientRequest.api";



export const useProductsByCategory = (category :string) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)  
    

    useEffect(() => {

        if(!category) return
        const load = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getProductsByCategory(category)
                setProducts(data)
            }catch (err: unknown) {
                if (err instanceof Error) setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        load();
    }, [category])
        return {products, loading, error}
    
}