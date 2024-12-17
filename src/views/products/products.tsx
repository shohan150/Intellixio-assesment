"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { PRODUCTS_DATA } from "@/data/productsData";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { ProductList } from "@/views/products/productList/productList";
import { ProductModal } from "@/views/products/productModal/productModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const pathname = usePathname(); // Current path
  const searchParams = useSearchParams(); // Query parameters
  const router = useRouter(); // Next.js router

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product);

      // Update URL without reloading
      const newUrl = `${pathname}?product-id=${product.id}`;
      router.push(newUrl);
    },
    [pathname, router]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);

    // route back to home/products/
    router.push(pathname);
  }, [pathname, router]);

  useEffect(() => {
    const productId = searchParams.get("product-id");

    if (productId) {
      const product = PRODUCTS_DATA.find((item) => item.id === productId);

      if (product) {
        setSelectedProduct(product);
      }
    } else {
      setSelectedProduct(null);
    }

    //whenever searchParams change, show/hide the modal.
  }, [searchParams]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
