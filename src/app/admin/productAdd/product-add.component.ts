import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';

@Component ({
    selector: 'product-menu',
    templateUrl: './product-add.component.html',
})

export class ProductAddComponent {

    imgTitle: string;
    imageSRC: string;
    name: string;
    description: string;
    price: number;
    product: Product;

    constructor( private prodAdminSVC: ProductAdminService, private router: Router ){}

//fileLoad method that will respond when the user loads an image. Before user creates post, the image needs to be uploaded. the event is passed from angular and let us access to file that is uploaded
    fileLoad($event: any ){
        let myReader:FileReader = new FileReader(); // then we use the fileReader method to create a new fileReader instance. FileReader is how we are going to read our image and then convert it to base64
        let file:File = $event.target.files[0]; // then we grab the file from our event 
        this.imgTitle = file.name; // and then after that we set the image title to the file name of the image
        myReader.readAsDataURL(file); // then we read our file as the dataURL which will return base64 image

        // after we read image, we use fileReader onload method to detect when  image is loaded. Once this is done we set the image to the image source variable
        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result; // we will use this to display the preview of this image,a s well as image 
        }
    }
 
    createProduct(){
        this.product = new Product (
            this.name,
            this.description,
            this.imgTitle,
            this.imageSRC.substring(23),
            this.price
        );

    //then we use the createPost from our blogAdminService  to past the post object to the service and create the post 
    this.prodAdminSVC.createProduct(this.product);
    // after we add the post we will alert the user
    alert(`${this.name} added to products`);
    this.router.navigate(['/admin']);
    }


    cancel(){
        this.router.navigate(['/admin']);
    }
}