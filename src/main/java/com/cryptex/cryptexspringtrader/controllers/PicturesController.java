//package com.cryptex.cryptexspringtrader.controllers;
//
//import org.springframework.core.io.InputStreamResource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//
//@Controller
//public class PicturesController {
//
//    @GetMapping("/images/{pictureName}")
//    public ResponseEntity<InputStreamResource> getPicture(@PathVariable String pictureName) throws IOException {
//        File pictureFile = new File("/static/images" + pictureName);
//        InputStream inputStream = new FileInputStream(pictureFile);
//        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG);
//        headers.setContentLength(pictureFile.length());
//        headers.setContentDispositionFormData("attachment", pictureName);
//
//        return new ResponseEntity<>(inputStreamResource, headers, 200);
//    }
//}
//
