import { ArrowLeft, Calendar, User, MapPin, Cpu } from 'lucide-react';
import type { BlogPost } from '../types/database';

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export default function BlogDetail({ post, onBack }: BlogDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to all posts</span>
        </button>

        <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            <img
              src={post.image_url || 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                post.category === 'places'
                  ? 'bg-emerald-500'
                  : 'bg-blue-500'
              }`}>
                {post.category === 'places' ? (
                  <>
                    <MapPin className="w-4 h-4" />
                    Places
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    Tech
                  </>
                )}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(post.created_at)}
              </span>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
