-- Find all blog_post_categories rows with invalid category_id
SELECT *
FROM blog_post_categories bpc
LEFT JOIN blog_categories bc ON bpc.category_id = bc.id
WHERE bc.id IS NULL;

-- Delete all blog_post_categories rows with invalid category_id
DELETE FROM blog_post_categories
WHERE category_id NOT IN (SELECT id FROM blog_categories);
