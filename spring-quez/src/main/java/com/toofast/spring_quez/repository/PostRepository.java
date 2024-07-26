package com.toofast.spring_quez.repository;

import com.toofast.spring_quez.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
    Post getPost(String id);
    List<Post> getPosts();
}
