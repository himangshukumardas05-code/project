import { Calendar, User, MapPin, Cpu } from 'lucide-react';
import type { BlogPost } from '../types/database';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.image_url || 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
            post.category === 'places'
              ? 'bg-emerald-500 text-white'
              : 'bg-blue-500 text-white'
          }`}>
            {post.category === 'places' ? (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Places
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Cpu className="w-4 h-4" />
                Tech
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.created_at)}
          </span>
        </div>
      </div>
    </article>
  );
}
