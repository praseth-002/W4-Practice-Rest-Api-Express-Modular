// controllers/categoryController.js
import { categories, articles } from '../models/data.js';

export function getAllCategories(req, res) {
    res.json(categories);
}

export function getCategoryById(req, res) {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
}

export function createCategory(req, res) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
    }
    const newCategory = {
        id: categories.length + 1,
        name
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
}

export function updateCategory(req, res) {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const { name } = req.body;
    if (name) category.name = name;

    res.json(category);
}

export function deleteCategory(req, res) {
    const id = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Category not found' });

    categories.splice(index, 1);
    res.status(204).send();
}

export function getArticlesByCategory(req, res) {
    const id = parseInt(req.params.id);
    const categoryArticles = articles.filter(a => a.categoryId === id);
    res.json(categoryArticles);
}
