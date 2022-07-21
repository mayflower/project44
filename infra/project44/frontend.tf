module "frontend_files" {
  source = "hashicorp/dir/template"

  base_dir      = "../../frontend/project-44/build"
  template_vars = {}
}

resource "aws_s3_object" "frontend" {
  for_each     = module.frontend_files.files
  bucket       = module.s3_bucket.s3_bucket_id
  key          = each.key
  content_type = each.value.content_type
  source       = each.value.source_path
  content      = each.value.content
  etag         = each.value.digests.md5
}
