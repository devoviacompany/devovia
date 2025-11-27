/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Icons } from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { updateFeedbackType, FeedbackMessage, FeedbackStatus } from "@/types/api/app/feedback/feedback.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditData {
  feedbackType: updateFeedbackType['feedbackType'];
  message: string;
}

export default function FeedbackEditPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<EditData>({ feedbackType: 'suggestion', message: '' });
  const [status, setStatus] = useState<FeedbackStatus>('open');
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sending, setSending] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit Feedback</CardTitle>
            <CardDescription>Update your previous feedback submission.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icons.spinner className="h-4 w-4 animate-spin" /> Loading
              </div>
            ) : (
              <form
                className="space-y-8">
                <div>
                  <Label className="text-base font-medium">Feedback type</Label>
                  <RadioGroup
                    className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4"
                    value={form.feedbackType}
                    onValueChange={(v: EditData['feedbackType']) => setForm(prev => ({ ...prev, feedbackType: v }))}
                  >
                    <div>
                      <RadioGroupItem value="bug-report" id="bug-report" className="peer sr-only" />
                      <Label htmlFor="bug-report" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer ${form.feedbackType === 'bug-report' ? 'border-primary bg-accent' : ''}`}>Bug Report</Label>
                    </div>
                    <div>
                      <RadioGroupItem value="feature-request" id="feature-request" className="peer sr-only" />
                      <Label htmlFor="feature-request" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer ${form.feedbackType === 'feature-request' ? 'border-primary bg-accent' : ''}`}>Feature Request</Label>
                    </div>
                    <div>
                      <RadioGroupItem value="suggestion" id="suggestion" className="peer sr-only" />
                      <Label htmlFor="suggestion" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer ${form.feedbackType === 'suggestion' ? 'border-primary bg-accent' : ''}`}>Suggestion</Label>
                    </div>
                    <div>
                      <RadioGroupItem value="other" id="other" className="peer sr-only" />
                      <Label htmlFor="other" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer ${form.feedbackType === 'other' ? 'border-primary bg-accent' : ''}`}>Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="msg">Message</Label>
                  <Textarea id="msg" value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} rows={6} required />
                </div>
                <div className="flex items-center gap-2">
                  <Button type="submit" disabled={saving} className="cursor-pointer">
                    {saving ? <Icons.spinner className="h-4 w-4 animate-spin mr-2" /> : null}
                    Save changes
                  </Button>
                  <Button type="button" variant="destructive"
                    className="cursor-pointer">Delete</Button>
                  <Button type="button" variant="outline" onClick={() => router.back()} className="cursor-pointer">Cancel</Button>
                </div>

                {/* Conversation thread */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Conversation</h3>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Status</Label>
                      <select
                        className="h-9 rounded-md border bg-background px-2 text-sm"
                        value={status}
                      >
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      {statusSaving ? <Icons.spinner className="h-4 w-4 animate-spin" /> : null}
                    </div>
                  </div>

                  <div className="rounded-md border bg-muted/40 p-4 max-h-[360px] overflow-auto space-y-3">
                    {messages.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No messages yet.</p>
                    ) : (
                      messages.map((m, idx) => (
                        <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow ${m.sender === 'user' ? 'bg-primary/90 text-primary-foreground' : 'bg-white border'}`}>
                            <div className="opacity-80 text-xs mb-1">{m.sender === 'user' ? 'You' : 'Support'}</div>
                            <div>{m.message}</div>
                            <div className="mt-1 text-xs opacity-90">{new Date(m.createdAt).toLocaleString()}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex items-end gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={3}
                    />
                    <Button type="button"
                      disabled={sending || !newMessage.trim()} className="self-stretch">
                      {sending ? <Icons.spinner className="h-4 w-4 animate-spin mr-2" /> : <Icons.Send className="h-4 w-4 mr-2" />}
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
