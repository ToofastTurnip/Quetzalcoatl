package com.toofast.spring_quez.controller;

import com.toofast.spring_quez.entity.Post;
import com.toofast.spring_quez.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/{id}")
    public Post getPost(@PathVariable String id) {
        return postService.getPostById(id);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Post postPost(@RequestBody Post post) {
        // haha postPost that's not confusing
        return postService.createPost(post);
    }

}
