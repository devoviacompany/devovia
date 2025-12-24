/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/global/icons";
import type { SupportCategory, SupportMessage, SupportStatus } from "@/types/api/app/support/support.type";

interface EditSupportData {
  fullName: string;
  email: string;
  category: SupportCategory;
  subject: string;
  message: string;
}

export default function SupportEditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<EditSupportData>({ fullName: "", email: "", category: "general", subject: "", message: "" });
  const [status, setStatus] = useState<SupportStatus>("open");
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit Support Ticket</CardTitle>
            <CardDescription>Update your request or message to Support.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icons.spinner className="h-4 w-4 animate-spin" /> Loading
              </div>
            ) : (
              <form
                className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={form.fullName}
                      onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                      readOnly
                      disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={form.category} onValueChange={(v: SupportCategory) => setForm(prev => ({ ...prev, category: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="feature-request">Feature Request</SelectItem>
                      <SelectItem value="bug-report">Report a Bug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" value={form.subject} onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} rows={6} required />
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
                      <Select
                        value={status}
                        >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
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
