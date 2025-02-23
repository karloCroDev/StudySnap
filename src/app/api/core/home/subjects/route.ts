// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Models
import { SubjectClass } from '@/models/subject';
import { GetSubjectByCreatorId, GetSubjectById } from '@/database/pool';

//Internal functions
import { GetImage, WriteImage } from '@/database/ImageHandler';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const subjects = await GetSubjectByCreatorId(userId as string);

    if (!subjects) {
      return NextResponse.json({ status: 404, statusText: 'Subjects not found' });
    }

    return NextResponse.json(subjects, { status: 200, statusText: "Fetched successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to get subjects' });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Extract and verify the JWT
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ status: 401, statusText: 'Unauthorized' });
    }

    const formData = await req.formData();
    const creator = token.uid;
    const subjectName = formData.get('subjectName') as string;
    const details = formData.get('details') as string | null;
    const file = formData.get('file');

    if (!subjectName || !creator) {
      return NextResponse.json({ status: 400, statusText: 'Missing required fields' });
    }

    const imagePath = await WriteImage(file);

    const id = await SubjectClass.Insert(
      subjectName,
      details ? details : '',
      creator.toString(),
      imagePath
    );

    if (id === null) {
      console.error('Creating Subject in database did not return id');
      return NextResponse.json({ status: 500, statusText: 'Creating Subject in database did not return id' });
    }

    const subject = await GetSubjectById(id);


    return  NextResponse.json(subject, { status: 201, statusText: "Created successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to create subject' });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Extract and verify the JWT
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ status: 401, statusText: 'Unauthorized' });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ status: 400, statusText: 'Missing required fields' });
    }

    await SubjectClass.Delete(id);
    return NextResponse.json({ status: 200, statusText: 'Subject deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to delete subject' });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Extract and verify the JWT
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ status: 401, statusText: 'Unauthorized' });
    }

    const formData = await req.formData();

    const subjectId = formData.get('subjectId') as string;
    const subjectName = formData.get('subjectName');
    const details = formData.get('details');
    const file = formData.get('file');

    if (!subjectId) {
      return NextResponse.json({
        status: 400,
        statusText: 'Missing subject Id',
      });
    }

    const updates: { [key: string]: any } = {};
    if (subjectName) updates.name = subjectName;
    if (details) updates.details = details;
    if (file) updates.image_url = await WriteImage(file);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ status: 400, statusText: 'No fields to update' });
    }

    await SubjectClass.Update(subjectId, updates);


    return NextResponse.json({ status: 200, statusText: 'Subject updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to update subject' });
  }
}
