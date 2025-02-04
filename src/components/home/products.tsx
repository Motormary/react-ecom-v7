import { TYPE_PRODUCTS, TYPE_RESPONSE } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import ErrorBox from "../error"
import { useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"

const getProducts = async (): Promise<TYPE_RESPONSE<TYPE_PRODUCTS[]>> => {
  const headers = new Headers()
  headers.append("Content-type", "application/json")

  const response = await fetch("https://v2.api.noroff.dev/online-shop", {
    method: "GET",
    headers,
  })

  if (!response.ok) {
    throw new Error(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
      })
    )
  }

  return await response.json()
}

export default function Products() {
  const [failed, setFailed] = useState(false)
  const { isPending, data, error, refetch, isFetching, status } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: false,
  })

  useEffect(() => {
    switch (status) {
      case "error": {
        setFailed(true)
        break
      }
      case "success": {
        setFailed(false)
        break
      }
    }
  }, [status])

  if (isPending && !failed)
    return (
      <div className="py-20 grid place-items-center">
        <RefreshCw className="animate-spin size-10" />
      </div>
    )

  if (failed) {
    const parsedError = (error?.message && JSON.parse(error.message)) ?? null
    return (
      <div className="py-20 grid place-items-center gap-4">
        <ErrorBox
          error={parsedError}
          refetch={refetch}
          isFetching={isFetching}
        />
      </div>
    )
  }

  return (
    <div>
      {data?.data.map((product) => {
        return <div key={product.id}>{product.id}</div>
      })}
    </div>
  )
}
