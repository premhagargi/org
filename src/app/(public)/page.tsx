import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart, Briefcase, FileText } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Streamline Your Organization with OrgHQ
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The all-in-one platform to manage your employees, departments, and view insightful analytics.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/register" prefetch={false}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/11/600/400"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="teamwork collaboration"
                className="mx-auto overflow-hidden sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block bg-primary text-primary-foreground px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything You Need to Manage Your Team
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  OrgHQ provides a powerful suite of tools to help you manage your organization effectively and efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    Employee Directory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive directory of all employees with detailed profiles and statuses.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-primary" />
                    Department Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Organize your workforce by creating and managing departments with ease.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="w-6 h-6 text-primary" />
                    Analytics Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Visualize key metrics with insightful charts and data on your custom dashboard.
                  </p>
                </CardContent>
              </Card>
               <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    AI-Powered Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Leverage GenAI to draft employee profiles and summarize performance feedback instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
