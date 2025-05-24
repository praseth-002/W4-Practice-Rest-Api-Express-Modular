// controllers/articleController.js
import { articles } from '../models/data.js';

export function getAllArticles(req, res) {
    res.json(articles);
}

export function getArticleById(req, res) {
    const id = parseInt(req.params.id);
    const article = articles.find(a => a.id === id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
}

export function createArticle(req, res) {
    const { title, content, journalistId, categoryId } = req.body;
    if (!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newArticle = {
        id: articles.length + 1,
        title,
        content,
        journalistId,
        categoryId
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
}

export function updateArticle(req, res) {
    const id = parseInt(req.params.id);
    const article = articles.find(a => a.id === id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const { title, content, journalistId, categoryId } = req.body;
    if (title) article.title = title;
    if (content) article.content = content;
    if (journalistId) article.journalistId = journalistId;
    if (categoryId) article.categoryId = categoryId;

    res.json(article);
}

export function deleteArticle(req, res) {
    const id = parseInt(req.params.id);
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ error: 'Article not found' });

    articles.splice(index, 1);
    res.status(204).send();
}
