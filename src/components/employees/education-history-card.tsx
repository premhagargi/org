import type { Education } from '@/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export function EducationHistoryCard({ education }: { education?: Education[] }) {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Education History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="relative pl-6 before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-border last:before:h-0">
             <div className="absolute -left-0.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
            <h3 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
            <p className="text-sm text-muted-foreground">{edu.institution}</p>
            <p className="text-xs text-muted-foreground">{edu.startYear} - {edu.endYear} {edu.grade && `• Grade: ${edu.grade}`}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
