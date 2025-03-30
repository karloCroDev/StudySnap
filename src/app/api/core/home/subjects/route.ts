// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Database
import { GetSubjectByCreatorId, GetSubjectById } from '@/db/core/home/subjects';
import { WriteImage } from '@/db/imageHandler';

// Models
import { Subject, SubjectClass } from '@/models/subject';
import { SQLSyntaxCheck } from '@/lib/algorithms/stringVerification';

const secret = process.env.NEXTAUTH_SECRET;

//Function gets all users subjects
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (SQLSyntaxCheck([userId])) {
      return NextResponse.json({ messasge: 'Bad request' }, { status: 400 });
    }

    let subjects: Subject[] = await GetSubjectByCreatorId(userId as string);

    if (!subjects) {
      return NextResponse.json(
        { message: 'Subjects not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to get subjects',
      },
      { status: 500 }
    );
  }
}

//Function creates a new subject
export async function POST(req: NextRequest) {
  try {
    // Extract and verify the JWT
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401, statusText: 'Unauthorized' }
      );
    }

    const formData = await req.formData();
    const creator = token.uid;
    const subjectName = formData.get('subjectName') as string;
    const details = formData.get('details') as string | null;
    const file = formData.get('file');

    if (
      !subjectName ||
      !creator
      // || SQLSyntaxCheck([subjectName, details])
    ) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
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
      return NextResponse.json(
        { message: 'Creating Subject in database did not return id' },
        { status: 500 }
      );
    }

    const subject = await GetSubjectById(id);

    return NextResponse.json(
      { ...subject, message: `You have succesfully updated ${subject.name}` },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to create subject' },
      { status: 500 }
    );
  }
}

//Function deletes subjetcs
export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, imageUrl } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await SubjectClass.Delete(id, imageUrl);
    return NextResponse.json(
      { message: 'Subject deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to delete subject' },
      { status: 500 }
    );
  }
}

//Function chenges subjects
export async function PATCH(req: NextRequest) {
  try {
    // Extract and verify the JWT
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401, statusText: 'Unauthorized' }
      );
    }

    const formData = await req.formData();

    const subjectId = formData.get('subjectId') as string;
    const subjectName = formData.get('subjectName') as string;
    const details = formData.get('details') as string;
    const file = formData.get('file');

    if (
      !subjectId
      //  || SQLSyntaxCheck([subjectId, subjectName, details])
    ) {
      return NextResponse.json({ status: 400, statusText: 'Bad request' });
    }

    const updates: { [key: string]: any } = {};
    if (subjectName) updates.name = subjectName;
    if (details) updates.details = details;
    if (file) updates.image_url = await WriteImage(file);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({
        status: 400,
        statusText: 'No fields to update',
      });
    }

    await SubjectClass.Update(subjectId, updates);

    return NextResponse.json(
      { message: 'Subject updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to update subject' },
      { status: 500 }
    );
  }
}
