# تعليمات نشر الموقع على Netlify

## الإعدادات المطلوبة في Netlify:

### 1. Build settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 2. Environment variables:
لا حاجة لمتغيرات بيئية إضافية

### 3. Deploy settings:
- **Node version**: 18 أو أحدث

## خطوات النشر:

1. تأكد من رفع جميع الملفات إلى GitHub/GitLab/Bitbucket
2. في Netlify Dashboard:
   - اضغط على "New site from Git"
   - اختر المستودع الخاص بك
   - تأكد من الإعدادات التالية:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - اضغط "Deploy site"

## ملاحظات مهمة:

- ملف `netlify.toml` موجود ويحتوي على الإعدادات الصحيحة
- ملف `_redirects` موجود في مجلد `public` للتعامل مع React Router
- جميع المسارات (routes) ستعمل بشكل صحيح

## استكشاف الأخطاء:

إذا لم يظهر الموقع:
1. تحقق من سجلات البناء (Build logs) في Netlify
2. تأكد من أن `npm run build` يعمل محلياً بدون أخطاء
3. تحقق من أن مجلد `dist` يحتوي على الملفات بعد البناء

