package com.toofast.spring_quez.service;

import com.toofast.spring_quez.entity.Post;
import com.toofast.spring_quez.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Post getPostById(String id) {
        return postRepository.getPost(id);
    }

    public List<Post> getAllPosts() {
        return postRepository.getPosts();
    }

}
