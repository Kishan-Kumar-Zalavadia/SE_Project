package com.app.backend.Controller;

import com.app.backend.Entity.Product;
import com.app.backend.Service.ProductService;
import com.app.backend.Service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:4200") // Allow requests from http://localhost:4200
@CrossOrigin(origins = "*")
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    // Add Product
    @PostMapping("/saveProduct")
    public Product saveProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    // Ger all the Products
    @GetMapping("")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    // Get Product by productID
    @GetMapping("{productId}")
    public Product getProductByID(@PathVariable int productId) {
        return productService.getProductByID(productId);
    }

    // Get List of Products by sellerID
    @GetMapping("/seller/{sellerID}")
    public List<Product> getProductBySellerID(@PathVariable int sellerID){
        return productService.getProductsBySellerID(sellerID);
    }

    // Delete Product
    @DeleteMapping("{productID}")
    public void deleteProductByProductID(@PathVariable int productID){
        productService.deleteProductByID(productID);
    }

    // Update or Edit Product Details
//    @PutMapping("{productID}")
//    public Product updateProduct(@PathVariable int productID, @RequestBody Product product) {
//        Product updateProduct = productService.getProductByID(productID);
//        updateProduct.setCategory(product.getCategory());
//        updateProduct.setPrice(product.getPrice());
//        updateProduct.setStatus(product.getStatus());
//        updateProduct.setDescription(product.getDescription());
//        updateProduct.setBuyerID(product.getBuyerID());
//        updateProduct.setTitle(product.getTitle());
//
//        productService.saveProduct(updateProduct);
//
//        return product;
//    }

    @PutMapping("{productID}")
    public Product updateProduct(@PathVariable int productID, @RequestBody Product product) {
        Product updateProduct = productService.getProductByID(productID);
        BeanUtils.copyProperties(product, updateProduct, "id"); // Exclude copying 'id' property
        productService.saveProduct(updateProduct);

        return updateProduct;
    }

    @GetMapping("{buyerID}/{status}")
    public List<Product> getProductsByStatusAndUserId(@PathVariable int buyerID, @PathVariable int status){
        return productService.fetchProductByBuyerIDAndStatus(buyerID,status);
    }


    @PatchMapping("/{userID}/{productID}")
    public ResponseEntity<String> updateProductStatusAndBuyerID(
            @PathVariable int userID,
            @PathVariable int productID,
            @RequestBody int status) {
            // Retrieve the product by productID
            Product product = productService.getProductByID(productID);

            if (product == null) {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }


            // Update the product status and buyerID
            product.setStatus(status);
            product.setBuyerID(userID);

            // Save the updated product
            productService.saveProduct(product);

            userService.increaseBonusPoints(userID,5);
            userService.increaseBonusPoints(product.getSellerID(),10);

            return new ResponseEntity<>("Product status and buyerID updated successfully", HttpStatus.OK);
        }

    @PatchMapping("updateStatus/{productID}")
    public ResponseEntity<String> updateProductStatus(
            @PathVariable int productID,
            @RequestBody int status) {
        // Retrieve the product by productID
        Product product = productService.getProductByID(productID);

        if (product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
        // Update the product status and buyerID
        product.setStatus(status);

        // Save the updated product
        productService.saveProduct(product);

        return new ResponseEntity<>("Product status updated successfully", HttpStatus.OK);
    }

//    Get all available products
    @GetMapping("/available/{userID}")
    public List<Product> getAvailableProducts(@PathVariable int userID) {
        List<Product> availableProducts = productService.getAvailableProducts(userID);
        return availableProducts;
    }

    // Get all products which is sold by user and is group purchases
    @GetMapping("/groupPurchase/{userID}")
    public List<Product> getGroupPurchaseProducts(@PathVariable int userID){
        return productService.fetchGroupPurchaseProducts(userID);
    }

    // ----------------------------------------------------------------------------------------
    // For Admin


}
