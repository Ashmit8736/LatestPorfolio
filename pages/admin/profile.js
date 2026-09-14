import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Loader3D from '../../components/common/Loader3D';
import { compressImage } from '../../lib/clientImage';
import { toast } from '../../lib/toast';

export default function Profile() {
  const [formData, setFormData] = useState({ fullName: '', headline: '', shortBio: '', about: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [pendingFields, setPendingFields] = useState(new Set());

  const anyPending = pendingFields.size > 0;

  useEffect(() => {
    const warnBeforeLeaving = (e) => {
      if (!anyPending) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [anyPending]);

  useEffect(() => {
    fetch('/api/portfolio/profile').then(res => res.json()).then(data => {
      if (data.data) setFormData(data.data);
      setLoading(false);
    });
  }, []);

  const handlePhotoChange = (field) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField(field);
    try {
      const dataUrl = await compressImage(file);
      setFormData(f => ({ ...f, [field]: dataUrl }));
      setPendingFields(s => new Set(s).add(field));
    } catch (err) {
      toast.error(err.message || 'Photo processing failed. Please try again.');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setPendingFields(new Set());
        toast.success('Profile saved!');
      } else {
        const err = await res.json().catch(() => null);
        if (res.status === 401) {
          toast.error('Your session has expired. Please log in again.');
          window.location.href = '/login';
        } else {
          toast.error(err?.message || 'Error saving');
        }
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="admin-card"><Loader3D label="Loading profile" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Portfolio</p>
          <h1 className="admin-title">Manage Profile</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-3xl">
        {anyPending && (
          <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-ink">
            New photo ready — click "Save Profile" below to publish it. It won't be saved if you leave this page first.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="admin-label">Profile Photo (Hero section)</label>
            <div className="flex items-center gap-4">
              {formData.profileImage && (
                <img src={formData.profileImage} alt="Profile preview" className="w-16 h-16 rounded-full object-cover border border-line flex-shrink-0" />
              )}
              <div className="flex-1">
                <input type="file" accept="image/*" onChange={handlePhotoChange('profileImage')} disabled={!!uploadingField} className="admin-input" />
                {uploadingField === 'profileImage' && <p className="text-xs text-accent mt-1 font-semibold">Processing…</p>}
              </div>
            </div>
            <p className="text-xs text-muted mt-1.5">JPG, PNG, or WEBP. Square photos work best (recommended 800×800px, under 5MB). Used in the hero photo at the top of the site.</p>
          </div>
          <div>
            <label className="admin-label">About Section Photo</label>
            <div className="flex items-center gap-4">
              {formData.aboutImage && (
                <img src={formData.aboutImage} alt="About preview" className="w-16 h-16 rounded-lg object-cover border border-line flex-shrink-0" />
              )}
              <div className="flex-1">
                <input type="file" accept="image/*" onChange={handlePhotoChange('aboutImage')} disabled={!!uploadingField} className="admin-input" />
                {uploadingField === 'aboutImage' && <p className="text-xs text-accent mt-1 font-semibold">Processing…</p>}
              </div>
            </div>
            <p className="text-xs text-muted mt-1.5">JPG, PNG, or WEBP, any size (auto-resized). Used in the "Who is..." photo in the About section — can be a different photo from the hero one.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Full Name</label><input required value={formData.fullName || ''} onChange={e => setFormData({...formData, fullName: e.target.value})} className="admin-input" /></div>
          <div><label className="admin-label">Headline</label><input required value={formData.headline || ''} onChange={e => setFormData({...formData, headline: e.target.value})} className="admin-input" /></div>
        </div>
        <div><label className="admin-label">Short Bio</label><textarea required rows="2" value={formData.shortBio || ''} onChange={e => setFormData({...formData, shortBio: e.target.value})} className="admin-input" /></div>
        <div><label className="admin-label">About</label><textarea required rows="5" value={formData.about || ''} onChange={e => setFormData({...formData, about: e.target.value})} className="admin-input" /></div>
        <div>
          <label className="admin-label">Footer Tagline</label>
          <textarea rows="2" placeholder={`Leave blank to auto-generate from your name and headline`} value={formData.footerTagline || ''} onChange={e => setFormData({...formData, footerTagline: e.target.value})} className="admin-input" />
          <p className="text-xs text-muted mt-1.5">Short intro shown in the site footer, next to your logo.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Location</label><input value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="admin-input" /></div>
          <div><label className="admin-label">Email</label><input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="admin-input" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Phone</label><input value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="admin-input" /></div>
          <div><label className="admin-label">Resume URL</label><input value={formData.resumeUrl || ''} onChange={e => setFormData({...formData, resumeUrl: e.target.value})} className="admin-input" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">GitHub URL</label><input value={formData.githubUrl || ''} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="admin-input" /></div>
          <div><label className="admin-label">LinkedIn URL</label><input value={formData.linkedinUrl || ''} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} className="admin-input" /></div>
        </div>
        <div>
          <label className="admin-label">Stats Section (About page)</label>
          <p className="text-xs text-muted mb-2">Leave blank to auto-calculate from your Projects, Experiences, and Skills. Fill in to override with a custom value (e.g. "50+").</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="admin-label">Projects Built</label>
              <input placeholder="auto" value={formData.statsProjectsOverride || ''} onChange={e => setFormData({...formData, statsProjectsOverride: e.target.value})} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Companies Worked</label>
              <input placeholder="auto" value={formData.statsCompaniesOverride || ''} onChange={e => setFormData({...formData, statsCompaniesOverride: e.target.value})} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Technologies</label>
              <input placeholder="auto" value={formData.statsTechnologiesOverride || ''} onChange={e => setFormData({...formData, statsTechnologiesOverride: e.target.value})} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Years Experience</label>
              <input placeholder="auto" value={formData.statsYearsOverride || ''} onChange={e => setFormData({...formData, statsYearsOverride: e.target.value})} className="admin-input" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={saving || !!uploadingField} className="admin-btn admin-btn-primary admin-btn-block">
          {saving ? 'Saving…' : 'Save Profile'}
        </button>
      </form>
    </AdminLayout>
  );
}
