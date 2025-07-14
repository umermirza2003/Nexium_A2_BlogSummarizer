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

interface ProcessedBlog {
  url: string;
  title: string;
  content: string;
  summary: string;
  urduSummary: string;
  wordCount: number;
  readTime: number;
}

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessedBlog | null>(null);
  const [error, setError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const form = useForm<FormData>({
    resolver: zodResolver(urlSchema),
  });

  const steps = [
    { icon: Link, label: 'Input Blog URL', description: 'Enter the blog URL to process' },
    { icon: FileText, label: 'Scrape Text', description: 'Extract content from the webpage' },
    { icon: Brain, label: 'AI Summary', description: 'Generate intelligent summary' },
    { icon: Languages, label: 'Translate to Urdu', description: 'Convert summary to Urdu' },
    { icon: Database, label: 'Save Summary (Supabase)', description: 'Store summary in database' },
    { icon: Database, label: 'Save Full Text (MongoDB)', description: 'Store complete content' },
  ];

  const onSubmit = async (data: FormData) => {
    setIsProcessing(true);
    setError('');
    setResult(null);
    setCurrentStep(0);

    try {
      for (let i = 1; i <= steps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      const response = await fetch('/api/process-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to process blog');

      const processedData = await response.json();
      setResult(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900">
      <nav className="border-b border-pink-200 bg-pink-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-500 rounded-sm flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Blog Summariser</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-12">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Sparkles className="text-pink-400" />
            Smart Blog Summariser
          </h1>
          <p className="text-lg text-pink-700">
            Paste a blog URL and let our AI generate a clean summary for you — in both English and Urdu!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">✨ Features</h2>
          <ul className="list-disc list-inside space-y-2 text-pink-800">
            <li>Smart content scraping from blog URLs</li>
            <li>AI-generated summary in English</li>
            <li>Automatic Urdu translation</li>
            <li>Read time and word count estimation</li>
            <li>Summary stored in Supabase</li>
            <li>Full content saved in MongoDB</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🧾 How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-pink-800">
            <li>Paste a valid blog URL in the input box</li>
            <li>Click the <strong>Summarise</strong> button</li>
            <li>Watch as the system processes the blog step-by-step</li>
            <li>View summaries in both English and Urdu</li>
          </ol>
        </section>

        {/* Form */}
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="url"
              placeholder="Enter Blog URL"
              {...form.register('url')}
              className="h-12 bg-white border-pink-300 text-pink-800 placeholder:text-pink-400"
              disabled={isProcessing}
            />
            {form.formState.errors.url && (
              <p className="text-sm text-red-500">{form.formState.errors.url.message}</p>
            )}
            <Button
              type="submit"
              disabled={isProcessing}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Summarise'
              )}
            </Button>
          </form>
        </div>

        {/* Fancy Steps UI */}
        {isProcessing && (
          <div>
            <h2 className="text-2xl font-bold mb-4">🚀 Processing Steps</h2>
            <div className="relative h-2 bg-pink-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = currentStep > index + 1;
                const isActive = currentStep === index + 1;

                return (
                  <Card
                    key={index}
                    className={`
                      border ${
                        isCompleted
                          ? 'border-green-400 bg-green-50'
                          : isActive
                          ? 'border-pink-400 bg-white animate-pulse'
                          : 'border-pink-100 bg-pink-50'
                      } transition-all
                    `}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center 
                        ${isCompleted ? 'bg-green-400 text-white' :
                          isActive ? 'bg-pink-500 text-white' :
                          'bg-pink-100 text-pink-600'}
                      `}>
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                      </div>
                      <CardTitle className="text-base">{step.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-pink-700">{step.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert className="mb-8 border-red-300 bg-red-100 text-red-700">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Summary Results</h2>

            <Card className="bg-white border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-800">English Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pink-700 leading-relaxed mb-4">{result.summary}</p>
                <div className="flex gap-2">
                  <Badge className="bg-pink-200 text-pink-800">
                    {result.wordCount} words
                  </Badge>
                  <Badge className="bg-pink-200 text-pink-800">
                    {result.readTime} min read
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-800">Urdu Translation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pink-700 leading-relaxed text-right" dir="rtl">
                  {result.urduSummary}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
