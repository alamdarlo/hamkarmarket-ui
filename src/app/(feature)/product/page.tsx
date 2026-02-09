"use client";

import React, { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Slider,
} from "@mui/material";
import { AddShoppingCart, Sell } from "@mui/icons-material";
import { Order, OrderType, Product } from "./types/product";
import { useProducts } from "./queries/useProducts";

//const minDistance = 5;
function valuetext(value: number) {
  return `${value}°C`;
}



const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null | undefined>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("buy");
  const [order, setOrder] = useState<Order>();
  
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number>(10000000);

  // این تابع برای آپدیت کردن مقدار قیمت هنگام حرکت اسلایدره
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { data: productsData, isLoading, error, refetch } = useProducts();

  const products = productsData?.data || [];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    //fetchProducts();
  }, []);

  const handleOrderClick = (product: Product, type: OrderType) => {
    setSelectedProduct(product);
    console.log(product.avragePrice)
    const avg = (product.minPrice +product.maxPrice)/2
    setPrice(avg)
    setOrderType(type);
    setQuantity(1);
    setOrderDialogOpen(true);
  };

  const handleOrderSubmit = async () => {
    if (!selectedProduct) return;

    try {
      const orderData: Order = {
        productId: selectedProduct.id,
        type: orderType,
        quantity,
        totalPrice:price* quantity,
        status:'pending',
        createdAt: new Date().toISOString()
      };

      setOrder(orderData)
      // ارسال درخواست به بک‌اند
      // const response = await fetch("/api/orders", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(orderData),
      // });

      // if (response.ok) {
      //   setSnackbarMessage(
      //     orderType === "buy"
      //       ? "خرید با موفقیت ثبت شد"
      //       : "فروش با موفقیت ثبت شد",
      //   );
      //   setSnackbarOpen(true);
      //   setOrderDialogOpen(false);
      // }
    } catch (err) {
      setSnackbarMessage("خطا در ثبت سفارش");
      setSnackbarOpen(true);
    }
  };

  if (isLoading) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </Container>
    );
  }
  if (!productsData?.isSuccess) {
    debugger;
    const errorMessage = productsData?.errors || "خطا در دریافت محصولات";
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              تلاش مجدد
            </Button>
          }
        >
          {errorMessage}
        </Alert>
      </Container>
    );
  }
  return (
    <Container maxWidth="xl" className="py-8">
      {/* هدر و فیلترها */}
      <Box className="mb-8">
        <Typography
          variant={isMobile ? "h4" : "h3"}
          className="font-bold text-gray-800 mb-6 text-center"
        >
          محصولات
        </Typography>
      </Box>

      {/* لیست محصولات */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={product.id}
            className="flex"
          >
            <Card className="flex flex-col w-full hover:shadow-xl transition-shadow duration-300">
              {/* عکس محصول */}
              <Box className="relative">
                <CardMedia
                  component="img"
                  height="200"
                  image={'/productsImg/' + product.imageUrl}
                  alt={product.name}
                  className="h-48 object-cover"
                />
                {/* {product.stock < 10 && (
                  <Chip
                    label={`تنها ${product.stock} عدد باقی مانده`}
                    color="error"
                    size="small"
                    className="absolute top-2 left-2"
                  />
                )} */}
              </Box>

              {/* محتوای کارت */}
              <CardContent className="flex-grow">
                <Typography
                  gutterBottom
                  variant="h6"
                  className="font-bold line-clamp-2 h-14"
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="line-clamp-3 h-16 mb-4"
                >
                  {product.description}
                </Typography>
              </CardContent>

              {/* قیمت و دکمه‌ها */}
              <CardActions className="p-4 pt-0">
                <Box className="w-full">
                  <Box className="flex justify-between items-center mb-3">
                    <Box>
                      <Typography
                        variant="h6"
                        className="font-bold text-green-600"
                      >
                        {/* {product.price.toLocaleString()} تومان */}
                      </Typography>
                      {/* {product.sellPrice && (
                        <Typography variant="body2" className="text-red-500">
                          قیمت فروش: {product.sellPrice.toLocaleString()} تومان
                        </Typography>
                      )} */}
                    </Box>
                  </Box>

                  <Box className="flex gap-2">
                    <Button
                      fullWidth={isMobile}
                      variant="contained"
                      color="primary"
                      startIcon={<AddShoppingCart />}
                      onClick={() => handleOrderClick(product, "buy")}
                      // disabled={product.stock === 0}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      خرید
                    </Button>
                    <Button
                      fullWidth={isMobile}
                      variant="outlined"
                      color="secondary"
                      startIcon={<Sell />}
                      onClick={() => handleOrderClick(product, "sell")}
                      className="flex-1"
                    >
                      فروش
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* دیالوگ سفارش */}
      <Dialog
        open={orderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {orderType === "buy" ? "درخواست خرید " : "درخواست فروش"}
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box className="space-y-4 mt-2">
              <Box className="flex items-center space-x-3">
                <img
                  src={'productsImg/' + selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <Box>
                  <Typography variant="h6">{selectedProduct.name}</Typography>
                </Box>
              </Box>

              <Grid
                container
                spacing={2}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid size={{ xs: 12 }} className="flex">
                  <TextField
                    type="number"
                    label="تعداد"
                    size="small"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid size={{ xs: 8, }} offset={2} className="flex" sx={{ direction: 'ltr' }}>
                  <Box sx={{ width: 300 }}>
                    <Typography gutterBottom>انتخاب قیمت</Typography>

                    <Slider
                      value={price}
                      onChange={handleSliderChange}
                      min={selectedProduct.minPrice }  // کمترین مقدار: 10 میلیون
                      max={selectedProduct.maxPrice}  // بیشترین مقدار: 15 میلیون
                      step={selectedProduct.step}   // مقدار گام (مثلاً هر 100 هزار تومان تغییر کنه)
                      valueLabelDisplay="auto"
                      
                      valueLabelFormat={(value) => `${value.toLocaleString()} تومان`}
                    />

                    <Typography variant="h6" sx={{ mt: 2 }}>
                      قیمت انتخابی: {price?.toLocaleString()} تومان
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box className="bg-gray-50 p-3 rounded">
                <Typography variant="h6" className="mt-2">
                  مبلغ کل:
                  {price * quantity
                  //   (orderType === "buy"
                  //     ? selectedProduct.minPrice
                  //     : selectedProduct.maxPrice || 0) * quantity
                  // ).toLocaleString()
                  } 
                  &nbsp;
                  تومان
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>انصراف</Button>
          <Button
            variant="contained"
            onClick={handleOrderSubmit}
            color={orderType === "buy" ? "primary" : "secondary"}
          >
            تأیید {orderType === "buy" ? "خرید" : "فروش"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* اسنک‌بار */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductsPage;
