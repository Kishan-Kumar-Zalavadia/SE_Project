package com.app.backend.Controller;

import com.app.backend.Entity.GroupPurchases;
import com.app.backend.Entity.Product;
import com.app.backend.Service.GroupPurchasesService;
import com.app.backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://loud-egg-production.up.railway.app", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RequestMapping("/groupPurchaseProducts")
public class GroupPurchasesController {
    @Autowired
    private GroupPurchasesService groupPurchasesService;
    @Autowired
    private ProductService productService;

    @PostMapping("{productID}/{buyerID}")
    public GroupPurchases saveGroupProduct(@PathVariable int productID, @PathVariable int buyerID){
        GroupPurchases groupPurchases = new GroupPurchases();
        groupPurchases.setProductID(productID);
        groupPurchases.setBuyerID(buyerID);
        Product product = productService.getProductByID(productID);

        // Update the product status to 4 [Group Product]
//        product.setStatus(4);

        // Save the updated product
        productService.saveProduct(product);
        return groupPurchasesService.saveGroupPurchases(groupPurchases);
    }

    @GetMapping("{userID}")
    public List<Product> getProductsByBuyerIDFromGroupPurchases(@PathVariable int userID){
        return productService.getProductsByBuyerIDFromGroupPurchases(userID);
    }

}