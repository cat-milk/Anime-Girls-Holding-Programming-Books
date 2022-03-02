#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import shutil
from urllib.parse import quote

EXCLUDE_DIRS = ['.git', 'docs', '.vscode', 'overrides', '.github', 'script']
README_MD = ['README.md', 'readme.md', 'index.md']
INDEX_FILE = 'index.md'

IMAGE_EXTS = ['jpg', 'png', 'svg', 'jpeg', 'gif', 'webp']


def list_image(course: str):
    imagelist_text = f'# {os.path.basename(course)}\n'

    for root, dirs, files in os.walk(course):
        files.sort()
        readme_path = '{}/{}'.format(root, INDEX_FILE)
        level = root.replace(course, '').count(os.sep)
        for f in files:
            if f.split('.')[-1].lower() in IMAGE_EXTS:
                imagelist_text += '<figure markdown>\n'
                imagelist_text += '![]({})'.format(os.path.join(f))
                imagelist_text += '{ width="300" }\n'
                imagelist_text += '<figcaption>{}</figcaption>\n'.format(' '.join(
                    re.split(r'[-_\s]+',
                             os.path.splitext(os.path.basename(f))[0])))
                imagelist_text += '</figure>\n'

    return imagelist_text, readme_path


def generate_md(course: str, filelist_texts: str, readme_path: str, topic: str):
    final_texts = ['\n\n'.encode(), filelist_texts.encode()]
    topic_path = os.path.join('docs', topic)
    if not os.path.isdir(topic_path):
        os.mkdir(topic_path)
    with open(os.path.join(topic_path, '{}.md'.format(course)), 'wb') as file:
        file.writelines(final_texts)


if __name__ == '__main__':
    if os.path.exists('docs'):
        shutil.rmtree('docs')
    if not os.path.isdir('docs'):
        os.mkdir('docs')

    topics = list(
        filter(lambda x: os.path.isdir(x) and (x not in EXCLUDE_DIRS),
               os.listdir('.')))  # list topics

    for topic in topics:
        topic_path = os.path.join('.', topic)
        target_path = os.path.join('docs', topic)

        if os.path.exists(target_path):
            shutil.rmtree(target_path)
        shutil.copytree(topic_path, target_path)

        topic_path = os.path.join(".", topic)
        imagelist_text, readme_path = list_image(topic_path)
        generate_md('index', imagelist_text, readme_path, topic)

    with open('README.md', 'rb') as file:
        mainreadme_lines = file.readlines()

    with open('docs/index.md', 'wb') as file:
        file.writelines(mainreadme_lines)
