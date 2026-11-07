# App downloads

All Download buttons on the site point directly to the GitHub release asset:

```
https://github.com/Praveendev629/yt-signer/releases/download/yt-signer/YT.Signer.apk
```

GitHub serves release assets with `Content-Disposition: attachment`, so the APK
downloads while the visitor stays on your site — no navigation to github.com.

## Publishing a new version

1. Create a new GitHub release (or edit the existing one) and upload the new APK.
2. If the tag or asset name changes, update the URL in:
   - `index.html` — all `js-download` button `href`s
3. Commit and push — Vercel redeploys automatically.
