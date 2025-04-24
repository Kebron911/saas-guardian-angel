const BlogNewsletter = () => (
  <section className="newsletter bg-[#1A237E] text-white py-20 text-center">
    <div className="container max-w-[1200px] mx-auto px-5">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">Stay updated with the latest insights, trends, and strategies for AI assistants in business. No spam, just valuable content delivered monthly.</p>
      <form className="newsletter-form flex max-w-lg mx-auto">
        <input type="email" className="newsletter-input flex-1 px-4 py-3 rounded-l text-base text-gray-900" placeholder="Enter your email address" />
        <button type="submit" className="newsletter-button bg-[#00B8D4] text-white px-8 py-3 rounded-r font-bold hover:bg-[#009cb8] transition">Subscribe</button>
      </form>
    </div>
  </section>
);
export default BlogNewsletter;
