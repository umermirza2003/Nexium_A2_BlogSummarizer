// pages/index.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Link, FileText, Brain, Languages, Database, CheckCircle, BookOpen, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const urlSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
});

type FormData = z.infer<typeof urlSchema>;

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormData>({ resolver: zodResolver(urlSchema) });

  const steps = [
    { icon: Link, label: 'Input Blog URL', description: 'Enter the blog URL to process' },
    { icon: FileText, label: 'Scrape Text', description: 'Extract content from the webpage' },
    { icon: Brain, label: 'AI Summary', description: 'Generate intelligent summary' },
    { icon: Languages, label: 'Translate to Urdu', description: 'Convert summary to Urdu' },
    { icon: Database, label: 'Save to Supabase', description: 'Store summary securely' },
    { icon: Database, label: 'Archive Full Text', description: 'Store complete content in MongoDB' },
  ];

  const onSubmit = async (data: FormData) => {
    setIsProcessing(true);
    setError('');
    setResult(null);
    setCurrentStep(0);

    try {
      for (let i = 1; i <= steps.length; i++) {
        setCurrentStep(i);
        await new Promise(res => setTimeout(res, 500));
      }

      const res = await fetch('/api/process-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Processing failed');

      const processed = await res.json();
      setResult(processed);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsProcessing(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white">
      <nav className="bg-green-900 border-b border-green-700">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <BookOpen className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold">Blog Summariser</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-lime-300 flex items-center gap-2">
            <Sparkles className="text-lime-400" /> AI Blog Summariser
          </h1>
          <p className="text-green-200 text-lg">
            Paste a blog URL to get smart summaries in English and Urdu instantly.
          </p>
        </header>

        <section>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="url"
              placeholder="Enter blog URL..."
              {...form.register('url')}
              className="bg-green-800 border-green-600 text-white placeholder:text-green-400"
              disabled={isProcessing}
            />
            {form.formState.errors.url && (
              <p className="text-sm text-red-400">{form.formState.errors.url.message}</p>
            )}
            <Button
              type="submit"
              disabled={isProcessing}
              className="bg-lime-500 hover:bg-lime-600 text-black px-6"
            >
              {isProcessing ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</>
              ) : (
                'Summarise'
              )}
            </Button>
          </form>
        </section>

        {isProcessing && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-lime-300">🔄 Processing Pipeline</h2>
            <div className="w-full h-2 bg-green-700 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-lime-400 to-green-400 h-full transition-all duration-500"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const active = currentStep === index + 1;
                const done = currentStep > index + 1;
                return (
                  <Card
                    key={index}
                    className={`border transition-all duration-300 shadow-md bg-white/5 ${done ? 'border-green-500' : active ? 'border-lime-400 animate-pulse' : 'border-green-700'}`}
                  >
                    <CardHeader className="flex items-center gap-4">
                      <div className={`w-9 h-9 flex items-center justify-center rounded-full ${done ? 'bg-green-500' : active ? 'bg-lime-500' : 'bg-green-800'} text-white`}>
                        {done ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <CardTitle className="text-white text-base">{step.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-green-300">{step.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {error && (
          <Alert className="bg-red-900/30 border-red-500 text-red-300">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-lime-300">📄 Results</h2>

            <Card className="bg-green-900 border-green-600">
              <CardHeader>
                <CardTitle className="text-lime-300">English Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-100 leading-relaxed mb-4">{result.summary}</p>
                <div className="flex gap-2">
                  <Badge className="bg-lime-600 text-black">{result.wordCount} words</Badge>
                  <Badge className="bg-lime-600 text-black">{result.readTime} min read</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-900 border-green-600">
              <CardHeader>
                <CardTitle className="text-lime-300">Urdu Translation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-100 leading-relaxed text-right" dir="rtl">{result.urduSummary}</p>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}
