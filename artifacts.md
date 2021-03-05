---
layout: page
title: Artifacts
---

<h2>Unexplained artifacts and famous forgeries</h2>

<div class="posts">
  {% for post in site.posts %}
    {% if post.layout == 'artifact' %}
    <div class="post">
      <h3 class="post-title">
        <a href="{{ post.url }}">
          » {{ post.title }}
        </a>
      </h3>

      <span class="post-date">{{ post.excerpt }}</span>
    </div>
    {% endif %}
  {% endfor %}
</div>
